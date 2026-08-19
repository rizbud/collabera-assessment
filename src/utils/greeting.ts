// Translation key for the current time of day, translated where it is rendered
// so it follows the selected language
export function greetingKey(): string {
  // Get the current hour in the user's local time zone
  const currentHour = new Date().getHours();
  let period: string;

  // Determine the appropriate greeting based on the current hour
  switch (true) {
    case currentHour < 12:
      period = "morning";
      break;
    case currentHour < 18:
      period = "afternoon";
      break;
    default:
      period = "evening";
      break;
  }

  return `home.greeting.${period}`;
}
