'use client'
import { Mail } from 'lucide-react'
import { useState, useCallback, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, X, Send } from 'lucide-react'
import { Button, TableColumn, TableHeader } from '@nextui-org/react'
import Papa from 'papaparse'
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@nextui-org/react"
import { z } from 'zod';
import { toast } from 'sonner'
import { sendMailsandInvoices } from '@/server/actions/invoices'
import { cn } from '@/lib/utils'



export default function FileDrop() {
  const [dots, setDots] = useState('')
  const [processable, setProcessable] = useState(true)
  const [files, setFiles] = useState<File[]>([])
  const [csvData, setCsvData] = useState<Array<string>[]>([])
  const [sending, setSending] = useState(false)
  const [jsonData, setJsonData] = useState<z.infer<typeof donationSchema>[]>()
  
  
  const donationSchema = z.object({
    Name: z.string().min(1, { message: "Name is required" }),
    Email: z.string().email({ message: "Invalid email format" }),
    Currency: z.enum(['CAD', 'USD', 'INR'], { message: "Invalid currency" }),
    Amount: z.number().positive({ message: "Amount must be a positive number" }),
    DateOfDonation: z.string().regex(
      /^\d{2}-[A-Za-z]{3}-\d{2}$/,
      { message: "Date must be in DD-MMM-YY format, e.g., 22-Oct-24" }
    ),
    PaymentStatus: z.enum(['Success', 'Failed'], { message: "Invalid payment status" }),
  });


  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(prevFiles => [...prevFiles, ...acceptedFiles])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const removeFile = () => {
    setFiles([])
    setCsvData([])
  }

  useEffect(() => {
    setProcessable(true)
    console.log(files)
    if (files.length === 0) return
    const file = files[0]
    Papa.parse(file, {
      skipEmptyLines: true,
      header: true,
      complete(results) {
        console.log(results.data)
      },
    })


    Papa.parse(file, {
      skipEmptyLines: true,
      header: false,
      complete: function (results: Papa.ParseResult<string[]>) {
        setCsvData(results.data as string[][])
        let hasError = false;
        for (let i = 0; i < results.data.length; i++) {
          const row = results.data[i];
          try {
            donationSchema.parse({
              Name: row[0],
              Email: row[1],
              Currency: row[2],
              Amount: Number(row[3]),
              DateOfDonation: row[4],
              PaymentStatus: row[5],
            });
          } catch (err) {
            if (err instanceof z.ZodError && i !== 0) {
              console.log(`Row ${i + 1}: ${err.errors.map((e) => e.message).join(", ")}`);
              toast.error(`${err.errors.map((e) => e.message).join(", ")}. Please check your file.`);
              setProcessable(false);
              hasError = true;
              break;
            }
          }
        }
        if (!hasError) {
          setJsonData(results.data.map((row) => ({
            Name: row[0],
            Email: row[1],
            Currency: row[2] as "CAD" | "USD" | "INR",
            Amount: Number(row[3]),
            DateOfDonation: row[4],
            PaymentStatus: row[5] as "Success" | "Failed",
          })));
          console.log(jsonData)
          toast.success("File is ready to go!");
        }
      }
    })
  }, [files])


  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev.length < 3 ? prev + '.' : ''))
    }, 500)

    return () => clearInterval(interval)
  }, [])

  const sendInvoice = async () => {
    setSending(true)
    if (jsonData) {
      await sendMailsandInvoices(jsonData)
      setFiles([])
      toast.success("Invoice sent successfully!")
    } else {
      toast.error("No data to send.");
    }
    setSending(false)
  }
  return (
    <div className="min-h-screen flex items-center z-10 justify-center bg-gray-100 p-4">
      <div className="w-full   flex justify-center items-center ">
        {files.length === 0 ?
          <div
            {...getRootProps()}
            className={`p-8 border-2 max-w-3xl h-[50vh] border-dashed border-zinc-600 rounded-lg text-center cursor-pointer w-full flex justify-center items-center flex-col transition-colors ${isDragActive ? 'border-primary bg-primary/10' : 'border-gray-300 hover:border-primary'
              }`}
          >
            <input {...getInputProps()} />
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">Drag &apos;n&apos; drop some files here, or click to select files</p>
          </div>
          : !sending ?
          <div className=' absolute top-16 max-h-[80vh] px-20 h-full  w-full'>
            <div className=' h-16  flex justify-between items-center'>
              <div className="left">
                <Button
                  variant='solid' startContent={<X/>} className=' top-2 left-2 text-white rounded-lg bg-red-500' size='md'
                  onClick={() => removeFile()}
                >
                  Remove file
                </Button>
              </div>
              <div className="right">
                <Button
                   variant='solid' endContent={<Send/>} className='top-2 right-2 text-white bg-second' radius='sm' size='md'
                  onClick={() => sendInvoice()}
                  isDisabled={!processable}
                >
                  Send Invoice
                </Button>
              </div>
            </div>
            <div className=' mt-8  overflow-auto relative z-0 h-full'>
                {csvData && csvData.length > 0 && <Table aria-label="datatable ">
                  <TableHeader>
                    {csvData[0]?.map((cell, index) => (
                    <TableColumn key={index}>{cell}</TableColumn>
                    ))}
                    {/* <TableColumn>Email</TableColumn>
                    <TableColumn>Currency</TableColumn>
                    <TableColumn>Amount</TableColumn>
                    <TableColumn>Date</TableColumn>
                    <TableColumn>Status</TableColumn> */}
                  </TableHeader>
                  <TableBody>
                    {csvData?.slice(1).map((row, index) => (
                      <TableRow className='text-zinc-700' key={index}>
                      {row?.map((cell, cellIndex) => (
                        <TableCell key={cellIndex} className={cn(cellIndex === 0 && "font-semibold")} >{cell}</TableCell>
                      ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>}
            </div>
          </div> :
          <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="relative mb-4">
            <Mail className="w-16 h-16 text-blue-500" />
          </div>
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">Sending Emails</h1>
          <p className="text-gray-600 mb-4">Please wait while we process your request</p>
          <p className="mt-4 text-sm text-gray-500">
            This may take a few moments{dots}
          </p>
        </div>
        }

      </div>
    </div>
  )
}