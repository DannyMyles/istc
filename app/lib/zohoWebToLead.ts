// Submits leads to Zoho CRM's Web-to-Lead endpoint via a hidden iframe POST,
// so it doesn't navigate the page away from our own contact form UI.
// Field names/values below come directly from Zoho's generated form snippet
// and must not be altered - Zoho validates the hidden tokens server-side.

const ZOHO_ACTION_URL = 'https://crm.zoho.com/crm/WebToLeadForm';
const ZOHO_IFRAME_NAME = 'zoho_web_to_lead_iframe';

export interface ZohoLeadData {
  firstName: string;
  lastName: string;
  email: string;
  designation: string; // "Subject" field on the Zoho form
  description: string; // "Message" field on the Zoho form
  phone?: string;
  company?: string;
}

function getOrCreateHiddenIframe(): HTMLIFrameElement {
  let iframe = document.querySelector<HTMLIFrameElement>(`iframe[name="${ZOHO_IFRAME_NAME}"]`);
  if (!iframe) {
    iframe = document.createElement('iframe');
    iframe.name = ZOHO_IFRAME_NAME;
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
  }
  return iframe;
}

function addHiddenField(form: HTMLFormElement, name: string, value: string) {
  const input = document.createElement('input');
  input.type = 'hidden';
  input.name = name;
  input.value = value;
  form.appendChild(input);
}

export function submitZohoLead(data: ZohoLeadData): void {
  if (typeof document === 'undefined') return;

  try {
    getOrCreateHiddenIframe();

    const form = document.createElement('form');
    form.action = ZOHO_ACTION_URL;
    form.method = 'POST';
    form.acceptCharset = 'UTF-8';
    form.target = ZOHO_IFRAME_NAME;
    form.style.display = 'none';

    // Do not remove this code - required by Zoho for the submission to be accepted.
    addHiddenField(form, 'xnQsjsdp', 'f3a2fe367f8a588b1dca24455e96ff2ef8a775a660e2e0d3339619b116544392');
    addHiddenField(form, 'zc_gad', '');
    addHiddenField(form, 'xmIwtLD', '67c5e31f5ea2cc6604651351397bd0f1e93578e538995182b0a15fd98a0925e779a34f97be44427109520eb86ea8aabb');
    addHiddenField(form, 'actionType', 'TGVhZHM=');
    addHiddenField(form, 'returnURL', 'null');
    addHiddenField(form, 'aG9uZXlwb3Q', '');

    // Mandatory fields
    addHiddenField(form, 'First Name', data.firstName);
    addHiddenField(form, 'Last Name', data.lastName);
    addHiddenField(form, 'Email', data.email);
    addHiddenField(form, 'Designation', data.designation);
    addHiddenField(form, 'Description', data.description);

    // Optional fields
    if (data.company) addHiddenField(form, 'Company', data.company);
    if (data.phone) addHiddenField(form, 'Phone', data.phone);

    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
  } catch (error) {
    console.error('Error submitting lead to Zoho CRM:', error);
  }
}
