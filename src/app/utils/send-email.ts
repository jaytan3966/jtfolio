import { FormData } from "../components/sections/contact";

export function sendEmail(data: FormData) {

  fetch('/api/email', {
    method: 'POST',
    body: JSON.stringify(data),
  }) 
  .then((res) => res.json())
  .then((response) => {
    return response;
  })
  .catch((err) => {
    console.error(err);
  })
}