# JHW External Website Form Submission — Workflow Setup Guide

**Platform:** Affiliate CRM (standard contact/lead management)  
**Workflow Name:** JHW External Website Form Submission  
**Purpose:** Automatically notify team when external website forms are submitted  

---

## Overview

Your Astro website forms (pointsbeyond.ai, davidlemairtennis.com) submit directly to your affiliate CRM endpoint. This workflow captures those submissions and sends notifications to you and your team.

**Form Submission Flow:**
1. User fills out form on website
2. Form POSTs to: `https://backend.leadconnectorhq.com/external-tracking/events`
3. Contact is created in CRM automatically
4. Workflow triggers on contact creation
5. Workflow sends notifications

---

## Step 1: Create the Workflow

1. Log into your **affiliate CRM account**
2. Navigate to **Automations** or **Workflows**
3. Click **"Create Workflow"** or **"New Automation"**
4. Name it: **`JHW External Website Form Submission`**
5. Choose workflow type: **"Contact-based"** or **"Lead-based"**
6. Click **"Save"** or **"Next"**

---

## Step 2: Set the Trigger

1. Look for **"Trigger"** or **"When"** section
2. Select: **"Contact Created"** or **"Lead Created"**
3. (Optional) Add condition to filter by source
4. Click **"Continue"** or **"Next"**

---

## Step 3: Add First Action — Email to User

1. Click **"Add Action"** or **"Then"**
2. Select: **"Send Email"**
3. Configure:
   - **To:** `{{email}}`
   - **From:** `info@pointsbeyond.ai`
   - **Subject:** `We received your inquiry`
   - **Body:** Thank you for contacting us. We appreciate your interest and will be in touch within one business day.
4. Click **"Save Action"** or **"Add"**

---

## Step 4: Add Second Action — Email to You

1. Click **"Add Action"** again
2. Select: **"Send Email"**
3. Configure:
   - **To:** `info@pointsbeyond.ai`
   - **From:** Your business email
   - **Subject:** `New contact submission from {{first_name}} {{last_name}}`
   - **Body:** Name: {{first_name}} {{last_name}} | Email: {{email}} | Phone: {{phone}} | Company: {{organization}} | Website: {{website}}
4. Click **"Save Action"**

---

## Step 5: Add Third Action — Optional Task

1. Click **"Add Action"**
2. Select: **"Create Task"**
3. Configure:
   - **Title:** `Follow up: {{first_name}} {{last_name}}`
   - **Assigned to:** [Your name]
   - **Due date:** Tomorrow
4. Click **"Save Action"**

---

## Step 6: Enable and Test

1. Set **"Status"** to **"Active"**
2. Click **"Save Workflow"**
3. Test: Go to pointsbeyond.ai/contact/, fill out and submit
4. Check email inbox in 1-2 minutes
5. Verify contact appears in CRM

---

## Field Variables

`{{first_name}}` | `{{last_name}}` | `{{email}}` | `{{phone}}` | `{{organization}}` | `{{website}}` | `{{created_at}}`

---

**Created:** May 22, 2026  
**Owner:** John Whitlock / Points Beyond AI
