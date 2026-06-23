/**
 * Injects a JSON-LD <script> block for structured data (schema.org).
 * Usage: <SchemaMarkup schema={courseSchema} />
 * Pass an array to render multiple schema blocks on one page.
 */
export default function SchemaMarkup({ schema }: { schema: object | object[] }) {
  const schemas = Array.isArray(schema) ? schema : [schema];
  return (
    <>
      {schemas.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
    </>
  );
}
