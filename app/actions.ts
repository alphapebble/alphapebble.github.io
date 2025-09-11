"use server";

export async function subscribeAction(formData: FormData) {
  if (formData.get("confirm_email")) {
    return { success: true };
  }

  const email = formData.get("email");
  const firstName = formData.get("firstname");

  if (!email || typeof email !== "string") {
    return { error: "A valid email is required." };
  }

  console.log("New Subscription:", {
    email,
    firstName,
    company: formData.get("company"),
  });

  // Here you would integrate with a service like Resend
  // try {
  //   await resend.emails.send({ ... });
  //   return { success: true };
  // } catch (error) {
  //   return { error: 'Something went wrong.' };
  // }

  await new Promise((res) => setTimeout(res, 1000));

  return { success: true };
}
