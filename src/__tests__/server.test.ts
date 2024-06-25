import request  from "supertest"
import server, {connectDB} from "../server"
import db from "../config/db"

jest.mock("../config/db")
describe("connectDB", () => {
    it("should handle database connection error", async () => {
        jest.spyOn(db, "authenticate").mockRejectedValueOnce(new Error("Hubo un error en la conexion a la bd"))

        const consoleSpy = jest.spyOn(console, "log")

        await connectDB()
        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("Hubo un error en la conexion a la bd"))
        expect(db.sync).not.toHaveBeenCalled()
    })
})