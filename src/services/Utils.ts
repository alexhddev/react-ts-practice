
export function parseBody(body: string): any {
  try {
    return JSON.parse(body);
  } catch (err) {
    return body;
  }
}