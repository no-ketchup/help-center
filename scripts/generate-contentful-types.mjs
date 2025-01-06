import { createClient } from 'contentful';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: '.env.local' })

const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID || '',
    accessToken: process.env.CONTENTFUL_MANAGEMENT_ACCESS_TOKEN || '',
    host: 'api.contentful.com',
    environment: 'master',
});

async function generateContentfulTypes() {
    try {
        const contentTypes = await client.getContentTypes();
        const typeDefinitions = contentTypes.items.map((contentType) => {
            const fields = contentType.fields.map((field) => {
                const fieldType = field.type === 'Array' ? `${field.items?.type}[]` : field.type;
                return `  ${field.id}: ${fieldType};`;
            }).join('\n');

            return `export interface ${contentType.sys.id} {\n${fields}\n}`;
        }).join('\n\n');

        const outputPath = path.resolve(__dirname, '../src/interfaces/contentful.ts');
        fs.writeFileSync(outputPath, typeDefinitions);

        console.log(`Contentful types generated at ${outputPath}`);
    } catch (error) {
        console.error('Error generating types:', error);
    }
}

generateContentfulTypes();