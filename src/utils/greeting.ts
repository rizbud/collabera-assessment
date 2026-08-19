export function greeting(name: string): string {
  // Get the current hour in the user's local time zone
  const currentHour = new Date().getHours();
  let greetingMessage: string;

  // Determine the appropriate greeting based on the current hour
  if (currentHour < 12) {
    greetingMessage = "Good morning";
  } else if (currentHour < 18) {
    greetingMessage = "Good afternoon";
  } else {
    greetingMessage = "Good evening";
  }

  return `${greetingMessage}, ${name}!`;
}
