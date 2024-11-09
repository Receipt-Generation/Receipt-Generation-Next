"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRef } from "react"

export default function Component() {
  const today = new Date().toLocaleDateString('en-CA')
  const printRef = useRef<HTMLDivElement>(null)
  
  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <Button onClick={handlePrint} className="mb-8 print:hidden">
          Print Receipt
        </Button>
        
        <Card ref={printRef} className="border-2 p-8">
          <CardHeader className="flex flex-row justify-between items-start space-y-0 pb-8">
            <div className="space-y-2">
              <svg className=" h-12 w-auto" xmlns="http://www.w3.org/2000/svg" width="71" height="55" fill="none" viewBox="0 0 71 55"><path fill="#113441" d="M62.883 50.1c.988 0 1.523.734 1.523 1.642v1.723h-.662v-1.616c0-.594-.293-1.115-.908-1.115-.594 0-.894.5-.894 1.102v1.629h-.661v-1.63c0-.6-.3-1.101-.909-1.101-.614 0-.888.52-.888 1.115v1.616h-.66v-1.716c0-.915.52-1.65 1.502-1.65.654 0 1.128.334 1.295.842.18-.508.641-.841 1.262-.841ZM56.498 52.904c.607 0 .941-.528.941-1.135v-1.576h.661v1.656c0 .948-.574 1.696-1.602 1.696-1.015 0-1.59-.755-1.59-1.703v-1.649h.661v1.583c0 .6.328 1.128.929 1.128ZM53.044 53.538c-.608 0-1.075-.24-1.33-.727l.508-.28c.167.326.434.447.795.447.374 0 .661-.154.661-.441 0-.688-1.876-.167-1.876-1.416 0-.574.507-.995 1.222-.995.607 0 1.021.28 1.228.661l-.507.288c-.14-.288-.407-.388-.708-.388-.307 0-.574.16-.574.42 0 .669 1.876.181 1.876 1.416 0 .621-.6 1.015-1.295 1.015ZM48.505 54.967h-.662v-3.145c0-.975.755-1.71 1.743-1.71a1.71 1.71 0 0 1 1.736 1.71c0 .989-.714 1.723-1.71 1.723-.44 0-.84-.194-1.108-.487v1.91Zm1.081-2.043c.608 0 1.075-.5 1.075-1.095 0-.601-.467-1.088-1.075-1.088-.614 0-1.081.487-1.081 1.088 0 .594.467 1.095 1.081 1.095ZM46.306 50.193h.66v3.272h-.66v-3.272ZM55.223 47.207c-5.051 0-8.904-3.885-8.904-8.613 0-4.694 3.853-8.58 8.904-8.58 5.05 0 8.904 3.886 8.904 8.58 0 4.728-3.853 8.613-8.904 8.613Zm0-5.472c1.845 0 3.076-1.425 3.076-3.108 0-1.716-1.23-3.141-3.076-3.141s-3.076 1.425-3.076 3.14c0 1.684 1.23 3.11 3.076 3.11ZM35.314 54.654c-4.015 0-6.93-1.78-8.419-4.954l4.825-2.59c.518 1.1 1.49 2.234 3.497 2.234 2.104 0 3.497-1.328 3.659-3.659-.778.68-2.008 1.198-3.853 1.198-4.501 0-8.128-3.464-8.128-8.321 0-4.695 3.854-8.515 8.905-8.515 5.18 0 8.904 3.594 8.904 8.547v6.411c0 5.828-4.048 9.649-9.39 9.649Zm.388-13.243c1.749 0 3.076-1.198 3.076-2.979 0-1.748-1.327-2.914-3.076-2.914-1.716 0-3.075 1.166-3.075 2.914 0 1.781 1.36 2.98 3.075 2.98ZM17.009 47.207c-5.051 0-8.904-3.885-8.904-8.613 0-4.694 3.853-8.58 8.904-8.58 5.05 0 8.904 3.886 8.904 8.58 0 4.728-3.853 8.613-8.904 8.613Zm0-5.472c1.845 0 3.076-1.425 3.076-3.108 0-1.716-1.23-3.141-3.076-3.141s-3.076 1.425-3.076 3.14c0 1.684 1.23 3.11 3.076 3.11ZM0 23.085h5.828v23.636H0V23.085ZM70.734 32a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"></path><path fill="#FFD43E" fill-rule="evenodd" d="M54.79 9.665a33 33 0 0 1 9.616 21.525 11.867 11.867 0 0 0-6.561-3.9 27 27 0 0 0-50.1-7.205H1.086A33 33 0 0 1 54.79 9.665ZM8.828 30.15Zm7.587-3.122a12.704 12.704 0 0 0 0 0Zm9.986 4.415Zm8.685-4.377a12.784 12.784 0 0 0 0 0Zm10.481 4.719Zm8.911-4.75a12.653 12.653 0 0 0 0 0Z" clip-rule="evenodd"></path><path fill="#EE8E1D" fill-rule="evenodd" d="M50.547 13.908a27.001 27.001 0 0 1 7.298 13.382c-.842-.18-1.72-.276-2.622-.276-1.22 0-2.394.174-3.497.499a20.999 20.999 0 0 0-40.81 1.108 11.8 11.8 0 0 0-2.088 1.529V20.085H7.744a27 27 0 0 1 42.803-6.177ZM26.401 31.443c-1.761-2.194-4.323-3.746-7.284-4.252 2.96.506 5.523 2.058 7.284 4.252Z" clip-rule="evenodd"></path><path fill="#971C1C" d="M46.306 30.888a15 15 0 0 0-28.613-3.856c3.56.192 6.67 1.873 8.708 4.411 2.172-2.69 5.563-4.396 9.399-4.396 4.11 0 7.642 1.802 9.767 4.738.231-.311.478-.61.739-.897Z"></path><path fill="#D62727" fill-rule="evenodd" d="M51.725 27.513a11.85 11.85 0 0 0-5.42 3.375 15 15 0 0 0-28.612-3.856 12.716 12.716 0 0 0-.684-.018c-2.237 0-4.317.586-6.093 1.607a21 21 0 0 1 40.81-1.108Z" clip-rule="evenodd"></path></svg>
              <div className="space-y-1">
                <h2 className="font-semibold">SGB</h2>
                <p className="text-sm">Charity is god</p>
                <p className="text-sm">Toronto, Canada</p>
              </div>
              <div className="space-y-1 text-sm">
                <p>Tel: +1(413)814-8989</p>
                <p>Web: Edekshana</p>
                <p>Email: sgb@gmail.com</p>
              </div>
            </div>
            <div className="text-right space-y-1">
              <h1 className="font-semibold text-xl">Receipt No. 12345</h1>
              <p className="text-sm">Charity Business No. 12</p>
              <a href="https://www.canada.ca/charities-giving" className="text-sm text-primary hover:underline">
                Canada Revenue Agency Website
              </a>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Received from (Name)</Label>
                <Input disabled id="name" defaultValue="Singh" />
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
                <Label htmlFor="phone">Phone</Label>
                <Input disabled id="phone" defaultValue="+1(413)827-2822" />
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input disabled id="amount" defaultValue="$100.00" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Donation Date</Label>
                <Input disabled id="date" type="date" defaultValue={today} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="purpose">Purpose</Label>
                <Input disabled id="purpose" defaultValue="Geeta Diwas" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="space-y-2">
                <Label htmlFor="date-issued">Date Issued</Label>
                <Input disabled id="date-issued" defaultValue={today} readOnly />
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
              Electronic receipt generated on behalf of charity by: Community Service Brands Inc.
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
  )
}