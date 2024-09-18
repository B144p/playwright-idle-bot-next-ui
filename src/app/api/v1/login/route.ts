// api > v1 > login > route.ts
import { PostRequestBody } from '@/app/api/v1/login/(interfaces)'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    const response = {
      message: 'GET call successfully!',
    }

    return NextResponse.json(response, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: 'An error occurred', error: error }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: PostRequestBody = await request.json()
    if (typeof body.title !== 'string' || typeof body.content !== 'string') {
      return NextResponse.json({ message: 'Invalid input. Both title and content must be strings.' }, { status: 400 })
    }

    const response = {
      message: 'Post created successfully!',
      data: body,
    }

    return NextResponse.json(response, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: 'An error occurred', error: error }, { status: 500 })
  }
}
