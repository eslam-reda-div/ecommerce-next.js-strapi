import { Resend } from "resend";
import { EmailTemplate } from "../../_components/email-template";
import emailjs from "@emailjs/browser";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const body = await req.json();

  

  try {
    console.log(body.files[0].product.attributes.files.data.attributes.url);
    var newmessage = body.files.map((file) => {
      var url = "https://ecommerce-next-js-strapi.onrender.com" + file.product.attributes.files.data.attributes.url;
      return url;
    });
    console.log(newmessage);
  
    console.log(body.email)

    // emailjs
    //   .send(
    //     'service_6gc9phi',
    //     'template_7jf3rm7',
    //     {
    //       from_name: "Eslam Tech",
    //       to_name: 'customer',
    //       from_email: "eslamreda542@gmail.com",
    //       to_email: body.email,
    //       message: newmessage.join("  /  ") ,
    //     },
    //     'J12u5IVLAxR-RS8IO'
    //   )
    //   .then(
    //     () => {
    //       console.log("SUCCESS!");
    //     }
    //   );

    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: [body.email],
      subject: "Orders From Eslam Tech",
      react: EmailTemplate({ body , newmessage }),
    });

    console.log(data);

    return Response.json({ data });
  } catch (error) {
    return Response.json({ error });
  }
}
