"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getOrganisationByInvoice } from "@/server/actions/invoices"
import { Organisation, Transactions } from "@prisma/client"
import { useEffect, useRef, useState } from "react"

export default function Component({
  params,
}: {
  params: Promise<{ invoiceId: string }>
}) {
  const [orgDetails, setOrgDetails] = useState<Organisation>()
  const [transDetails, setTransDetails] = useState<Transactions>()
  const [loading, setLoading] = useState(true);
  const [valid, setValid] = useState(true)

  useEffect(()=>{
    async function fetchData() {
      const invoiceId = (await params).invoiceId
      const orgInvDetails = await getOrganisationByInvoice(invoiceId);
      if(orgInvDetails.length === 0){
        setValid(false)
        return;
      }
      setOrgDetails(orgInvDetails[0] as Organisation)
      setTransDetails(orgInvDetails[1] as Transactions)
      console.log(orgInvDetails)
      setLoading(false)
    }
    fetchData()
  },[])

  const printRef = useRef<HTMLDivElement>(null)
  
  const handlePrint = () => {
    window.print()
  }
  if(valid){
  if (loading){
    return (
      <div className=" flex justify-center items-center h-screen">Loading...</div>
    )
  }else
  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <Button onClick={handlePrint} className="mb-8 print:hidden">
          Print Receipt
        </Button>
        
        <Card ref={printRef} className="border-2 p-8">
          <CardHeader className="flex flex-row justify-between items-start space-y-0 pb-8">
            <div className="space-y-2">
              {orgDetails?.orgLogo && <img src={orgDetails?.orgLogo} alt="logo" className=" w-16" />}
              <div className="space-y-1">
                <h2 className="font-semibold">{orgDetails?.orgName}</h2>
                <p className="text-sm">Charity is god</p>
                <p className="text-sm">{orgDetails?.orgAddr}</p>
              </div>
              <div className="space-y-1 text-sm">
                <p>Tel: {orgDetails?.orgPhone}</p>
                {orgDetails?.orgUrl && <p>Web: {orgDetails?.orgUrl}</p>}
                <p>Email: {orgDetails?.orgEmail}</p>
              </div>
            </div>
            <div className="text-right space-y-1">
              <h1 className="font-semibold text-sm">Receipt No. {transDetails?.receiptNo}</h1>
              <p className="text-sm"> {orgDetails?.orgName} </p>
              <a href="#" className="text-sm text-primary hover:underline">
                Verify This Receipt
              </a>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Received from (Name)</Label>
                <Input disabled id="name" value={transDetails?.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input disabled id="address" defaultValue="Street 45" />
              </div>
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input disabled id="city" defaultValue="Toronto" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="prov">Prov.</Label>
                <Input disabled id="prov" defaultValue="Ontario" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="postal">Postal Code</Label>
                <Input disabled id="postal" defaultValue="12345" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input className=" overflow-visible" disabled id="email"value={transDetails?.email} />
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input disabled id="amount" value={`${transDetails?.currency} ${transDetails?.amount}`} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Donation Date</Label>
                <Input disabled id="date"  value={transDetails?.date.toDateString()} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="purpose">Purpose</Label>
                <Input disabled id="purpose" defaultValue="Updated" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="space-y-2">
                <Label htmlFor="date-issued">Date Issued</Label>
                <Input disabled id="date-issued" value={transDetails?.date.toDateString()}  readOnly />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signature">Issuing Officer</Label>
                <div className="h-12  rounded-md bg-gray-50 flex items-center justify-center text-gray-500">
                  <img src="data:image/jpeg;base64,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4QAsxEEAbKURB5cN/BUjWHZtjNQ2/wCI1ppcblP+arHbiP8AMPFXlEHJv9X2uywVzryT6P8A+I7/AL/2rYYDshw9KyLuasT5i4DvxWT8G/8A2/3rpGylB8oYmxRtYxoa1o2DW8gB6L6hEQeXEbELl9GM9oWuJL8gL8BgJDHVH3LNjfm8+BA2/T1W+7UczZxmnhUxri3JZSVtOrt4F31j8m7/AD2W70pgoNOYKni6wHDBGA5w++/7zj7lBuACNue/upREBQTspXznkZFG58jmta0cTifADqgruu9XU9I4d1ucd7akPBWrA/FM/wAh6eqp2mdNiF8mue0WeMXgBJDFOdoqLd92gA/e322A5g+qr9PO1tQazm1NlY5bbK0hr4XFwjiklcPv7dNv5jy39l0XH6buZe7HlNYPjmkjdx1cYznBV8if+I/1PLyQYrIMjrccV6KbH6aJ5QSEssZAeBf0LIz+HqfHYHYXSvDFUrxwV42RRRtDGRsGzWtHIADw5eC+V+9VxtSS1dsRwQRt3fLK7YD3XL7upNQdok8uO0cyTHYZp4bGUkBa548meI+XP2QbjWOv3xXf9H9HV25POSO4HFg4o6/q4jkT6b8vHyWVoXQTMJM/L5iwcln5/iltSHfu9/Bm/T3/ACW30do7F6Updzj4uKZ4/p7L/tJT6ny9FYwEEAFekRAREQFGylEBERAREQEREBERAREQEREBERAREQc4yYdmO2fFVXEOr4fGutbEdJXkt/bgPyXRmhc7qyCn23W2T/D/ABDDsdAT94sdsQP/AJd+S6GHDog9KNwsTIZOjjoXS3rcMDGjcmR4aqjY1zLlHmvo7FT5SQ8vpLwY67fXiPX5boLnbtQVYHTWZmRRMG7nvdsAFzHXWt7eR01lH6YpOmoRxET5GXdsfDvsRH4uPr0W+r6LtZaw23rLIG+4HiZSi+CvGfb7x91v85p6pmNP2cK7+grTR8H9EAOAegQVbs1wuE0zpSlecYIrVmuySexK8cRJG5AJ6D0XxzfanjmTfQNLVpc3kTyDa7T3bT4bu6bKKHY5gYWsGQtX8gGfVbYmPCPTYcldcPgsZhYBDi6MFZg8I2Ab/NBz+joTNasux5LtDtB8THcUOLru2jZ7/wCfNdLo04KNaOvVhZDDGNmRsbsGhfcDZSghSiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgresNJwakZWl+kS079N5dVuQfXi3+sPUHyWnOldXWB3VzWkjYdtt61UMkPuST+yviIKdj+znBQTts32z5Sy0795ekMoB8w08h8grZDBFAwMhjYxg+60bBfVEEKURAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQf/9k=" alt="" className=" h-[200%] bg-blend-multiply" />
                </div>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex-col space-y-4 pt-8">
            <p className="font-medium text-center">
              Note: Please retain this official receipt for Income Tax Purposes. Thank you!
            </p>
            <p className="text-sm text-center text-muted-foreground">
              Thank you! You are awesome
            </p>
            <p className="text-xs text-center text-muted-foreground">
            For verification, this invoice can be authenticated at https://e-virtue.com/invoice/{transDetails?.tid}
            </p>
            <p className="text-xs text-center text-muted-foreground">
              Electronic receipt generated on behalf of charity by: {orgDetails?.orgName}
            </p>
          </CardFooter>
        </Card>
      </div>
      
      <style jsx global>{`
        @media print {
          @page {
            margin: 20mm;
          }
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          .print\\:hidden {
            display: none !important;
          }
        }
      `}</style>
    </div>
  )}else{
    return (
      <div>Invalid Link...</div>
    )
  }
}