import { buildPlan } from "@/lib/planner";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function POST(request: Request) {
  let body: { message?: unknown; forceFail?: unknown } = {};
  try {
    body = await request.json();
  } catch {
    // An unreadable body is treated as an empty request.
  }

  // Simulated planning time so the thinking state is visible.
  await wait(1800);

  if (body.forceFail === true) {
    return Response.json({ error: "Forced failure (demo trigger)" }, { status: 503 });
  }

  const message = typeof body.message === "string" ? body.message.slice(0, 500) : "";
  return Response.json(buildPlan(message));
}
