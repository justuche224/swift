import "dotenv/config";
import { auth } from "@/lib/auth";

const seedAdmin = async () => {
  try {
    console.log("seeding admin");
    const data = await auth.api.signUpEmail({
      body: {
        name: "Admin",
        email: "admin@example.com",
        password: "password1234",
        image: "https://example.com/image.png",
        role: "admin",
      },
    });
    console.log(data);
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};


async function main() {
  await seedAdmin();
}

main();