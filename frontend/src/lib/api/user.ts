import { UserType } from "@/types/user";

// Fetch user information
export const getUserInfo = async (): Promise<UserType> => {
  try {
    // const axios = useAuthAxios();
    // const response = await axios.get("/me");

    return {
      // Dummy data
      id: "12345",
      name: "John Doe",
      profileImageUrl: "/images/sample_profile.png",
      email: "johndoe@example.com",
      userFamilies: [
        {
          id: "67890",
          profileImageUrl: "/images/sample_profile.png",
          name: "Jane Doe",
        },
        {
          id: "11223",
          profileImageUrl: "/images/sample_profile.png",
          name: "Sam Doe",
        },
      ],
    };
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    }
    throw new Error("User not found");
  }
};
