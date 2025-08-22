'use client'

import { SignIn, SignUp, useUser } from '@clerk/nextjs'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function AuthPage() {
  const { isSignedIn } = useUser()
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')

  if (isSignedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Welcome!</h1>
          <p>You are already signed in. Redirecting to upload page...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-subtle">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome to Tumour.io
          </h1>
          <p className="text-muted-foreground">
            AI-Powered Brain Tumor Detection Platform
          </p>
        </div>

        <div className="flex justify-center mb-6">
          <div className="flex bg-muted rounded-lg p-1">
            <Button
              variant={mode === 'signin' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setMode('signin')}
              className="rounded-md"
            >
              Sign In
            </Button>
            <Button
              variant={mode === 'signup' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setMode('signup')}
              className="rounded-md"
            >
              Sign Up
            </Button>
          </div>
        </div>

        <div className="flex justify-center">
          {mode === 'signin' ? (
            <SignIn 
              appearance={{
                elements: {
                  rootBox: "mx-auto",
                  card: "shadow-lg"
                }
              }}
            />
          ) : (
            <SignUp 
              appearance={{
                elements: {
                  rootBox: "mx-auto",
                  card: "shadow-lg"
                }
              }}
            />
          )}
        </div>
      </div>
    </div>
  )
}