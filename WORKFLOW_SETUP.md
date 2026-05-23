# JHW External Website Form Submission — Workflow Setup Guide (Webhook)

**Platform:** Affiliate CRM  
**Workflow Name:** JHW External Website Form Submission  
**Trigger Type:** Inbound Webhook

---

## Step 1: Create Workflow

1. Log into affiliate CRM
2. Go to Automations or Workflows
3. Click Create Workflow
4. Name: JHW External Website Form Submission
5. Trigger: Inbound Webhook (NOT Form Submitted)
6. Click Next

---

## Step 2: Copy Webhook URL

The system generates a webhook URL. COPY THIS URL for your form config.

---

## Step 3: Create or Update Contact Record

1. Click Add Action
2. Select: Create or Update Contact Record
3. Map fields:
   - First Name = {{firstName}}
   - Last Name = {{lastName}}
   - Email = {{email}}
   - Phone = {{phone}}
   - Organization = {{company_name}}
   - Website = {{website}}
4. Click Save Action

---

## Step 4: Email to Contact

1. Click Add Action
2. Select: Send Email
3. To: {{email}}
4. From: info@pointsbeyond.ai
5. Subject: We received your inquiry
6. Body: Hi {{firstName}}, Thank you for contacting us. We will be in touch within one business day.
7. Click Save Action

---

## Step 5: Email to You

1. Click Add Action
2. Select: Send Email
3. To: info@pointsbeyond.ai
4. Subject: [LEAD] {{firstName}} {{lastName}} — {{company_name}}
5. Body: {{firstName}} {{lastName}} | {{email}} | {{phone}} | {{company_name}}
6. Click Save Action

---

## Step 6: Enable Workflow

1. Set Status to Active
2. Click Save Workflow

---

## Step 7: Update Form Endpoint

Update src/data/config.ts with your webhook URL:

endpoint: "https://your-affiliate.com/webhook/abc123xyz"

Then: git add src/data/config.ts && git commit -m "update webhook endpoint" && git push origin main

---

## Step 8: Test

1. Go to pointsbeyond.ai/contact/
2. Hard refresh
3. Submit test form
4. Verify contact created, emails sent

---

Created: May 23, 2026
