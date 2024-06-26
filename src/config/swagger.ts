import swaggerJSDoc from "swagger-jsdoc";

const options : swaggerJSDoc.Options = {
    swaggerDefinition:{
        openapi:"3.0.2",
        tags: [
            {
                name: "Products",
                description: "API relacionada a productos"
            }
        ],
        info: {
            title: "REST API Node.js / Express / TypeScript",
            version: "1.0.0",
            description: "REST API DOC de productos"
        }
    },
    apis: ["./src/router.ts"]
}
export const swaggerSpec = swaggerJSDoc(options)