import { WebhookEvent } from '@clerk/nextjs/server'
import { headers } from 'next/headers'
import { Webhook } from 'svix'

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET || ``


export async function validateRequestAndParseToJson(request: Request) {
	const payloadString = await request.text()
	const headerPayload = await headers();
  
	const svixHeaders = {
	  'svix-id': headerPayload.get('svix-id')!,
	  'svix-timestamp': headerPayload.get('svix-timestamp')!,
	  'svix-signature': headerPayload.get('svix-signature')!,
	}
	const wh = new Webhook(webhookSecret)
	return wh.verify(payloadString, svixHeaders) as WebhookEvent
  }