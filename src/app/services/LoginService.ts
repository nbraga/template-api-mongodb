import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import User from "../models/user";
import { UserProps } from "../../interfaces/userProps";
import { ApiError } from "../../utils/api-errors";

class LoginService {
    static async create(email: string, password: string) {
        const user: UserProps = await User.findOne({ email });

        if (!user) {
            throw new ApiError("Usuário ou senha incorreta!", 400);
        }

        const isMatchPassword = await compare(password, user.password);

        if (!isMatchPassword) {
            throw new ApiError("Usuário ou senha incorreta!", 400);
        }

        const token = sign(
            {
                _id: user._id,
                email: user.email,
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return {
            user,
            token,
            status: {
                code: 200,
                msg: "",
            },
        };
    }
}

export default LoginService;
