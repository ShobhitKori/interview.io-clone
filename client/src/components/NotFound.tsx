import React from "react"
import { Button } from "./ui/buttonn"
import { HomeIcon, ArrowLeft } from 'lucide-react'
import { DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_FORM_ACTIONS } from "react"


export default function NotFound() {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-background">
     
      <div className="container px-4 md:px-6 flex flex-col items-center text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter animate-pulse">404</h1>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">Page Not Found</h2>
          <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
            Oops! The page you're looking for seems to have vanished into the digital void.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild className="bg-black text-white">
            <a href="/" className="flex items-center space-x-2">
              <HomeIcon className="mr-2 h-4 w-4" />
              Back to Home
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href="javascript:history.back()" className="flex items-center space-x-2">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </a>
          </Button>
        </div>
        <div className="w-full max-w-md h-px bg-border" />
        <p className="text-sm text-muted-foreground">
          If you believe this is a mistake, please contact our support team.
        </p>
      </div>
    </div>
  )
}

