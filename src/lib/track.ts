export async function track(
  eventName: string,
  props?: { game?: string; page?: string }
) {
  try {
    await fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event_name: eventName, ...props }),
    });
  } catch {
    // tracking never breaks UX
  }
}
