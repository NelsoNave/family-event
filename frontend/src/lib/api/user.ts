import { UserType } from "@/types/user";
import { getServerAxiosInstance } from "./axios-server";

// Fetch user information
export const getUserInfo = async (): Promise<{ user: UserType }> => {
  try {
    const axiosInstance = await getServerAxiosInstance();
    const response = await axiosInstance.get("/me");
    return response.data;

    // ********** Uncomment the data below to use dummy data **********
    // return {
    //   // Dummy data
    //   user: {
    //     id: "12345",
    //     name: "Tracy",
    //     profileImageUrl: "/images/sample-family-1.png",
    //     email: "tracy@example.com",
    //     userFamilies: [
    //       {
    //         id: "67890",
    //         profileImageUrl: "/images/sample-family-1.png",
    //         name: "Jane Doe",
    //       },
    //       {
    //         id: "11223",
    //         profileImageUrl: "/images/sample-family-2.png",
    //         name: "Sam Doe",
    //       },
    //     ],
    //   },
    // };
  } catch (err) {
    if (err instanceof Error) {
      console.log(err, "errです");
      throw new Error();
    } else {
      throw new Error(String(err));
    }
  }
};
