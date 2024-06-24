import request from "supertest"
import server from "../../server"

describe("POST /api/products", () => {
    it("should display validation errors", async () => {
        const response = await request(server).post("/api/products").send({})

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("errors")
    })

    it("should validate that the price is greater than 0", async () => {
        const response = await request(server).post("/api/products").send({
            name: "mouse - test",
            price: 0
        })

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("errors")
        expect(response.body.errors).toHaveLength(1)

        expect(response.status).not.toBe(404)
        expect(response.body.errors).not.toHaveLength(2)
    })

    it("should create a new product", async()=>{
        const response = await request(server).post("/api/products").send({
            name: "mouse - test",
            price: 25
        })

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty("data")
        
        expect(response.status).not.toBe(404)
        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty("errors")
    })
})

describe("GET /api/products", () => {
    it("should check if api/products exists", async()=>{
        const response = await request(server).get("/api/products")
        expect(response.status).not.toBe(404)
    })

    it("GET a JSON response with products", async() => {
        const response = await request(server).get("/api/products")
        expect(response.status).toBe(200)
        expect(response.headers["content-type"]).toMatch(/json/)
        expect(response.body).toHaveProperty("data")
        expect(response.body.data).toHaveLength(1)
        expect(response.body).not.toHaveProperty("errors")

    })
})

describe("GET /api/products/:id", () => {
    it("should return a 404 response for a non-existent product", async() => {
        const productId = 2000
        const response = await request(server).get(`/api/products/${productId}`)
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty("message")
        expect(response.body.message).toBe("producto no encontrado")
    })

    it("should check a valid ID in the URL", async() => {
        const response = await request(server).get("/api/products/not-valid-id")
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("errors")
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe("ID no valido")
    })

    it("get a JSON response for a single product", async() => {
        const response = await request(server).get("/api/products/1")
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("data")
    })
})

describe("PUT /api/products/:id", () => {
    it("should display validation error message when updating a product", async() => {
        const response = await request(server).put("/api/products/1").send({})
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("errors")
        expect(response.body.errors).toBeTruthy()
        expect(response.body.errors).toHaveLength(5)

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty("data")
    })

    it("should validate that the price is greater than 0", async() => {
        const response = await request(server).put("/api/products/1").send({
            name: "Monitor test",
            price: -100,
            availability: true
        })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("errors")
        expect(response.body.errors).toBeTruthy()
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe("Precio no valido")

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty("data")
    })

    it("should return a 404 response for a non-existent product", async() => {
        const productId = 2000
        const response = await request(server).put(`/api/products/${productId}`).send({
            name: "Monitor test",
            price: 100,
            availability: true
        })

        expect(response.status).toBe(404)
        expect(response.body.message).toBe("producto no encontrado")

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty("data")
    })

    it("should update an existing product with valid data", async() => {
        const productId = 1
        const response = await request(server).put(`/api/products/${productId}`).send({
            name: "Monitor test",
            price: 100,
            availability: true
        })

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("data")

        expect(response.status).not.toBe(400)
        expect(response.body).not.toHaveProperty("errors")
    })
    
})

describe("DELETE /api/products/:id", () => {
    it("should check a valid ID", async() => {
        const response = await request(server).delete("/api/products/not-valid")
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("errors")
        expect(response.body.errors[0].msg).toBe("ID no valido")
    })

    it("should return a 404 response for a non-existent product", async() => {
        const productId = 2000
        const response = await request(server).delete(`/api/products/${productId}`)
        expect(response.status).toBe(404)
        expect(response.body.message).toBe("producto no encontrado")
        expect(response.status).not.toBe(200)
    })

    it("should delete a product", async() => {
        const response = await request(server).delete("/api/products/1")
        expect(response.status).toBe(200)
        expect(response.body.message).toBe("producto eliminado")
        
        expect(response.status).not.toBe(400)
        expect(response.status).not.toBe(404)
    })
})
