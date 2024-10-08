import { NextResponse } from "next/server";

export async function POST(req: Request) {
  if (!process.env.CLOUDINARY_API_SECRET) {
    return new Response(
      "Missing CLOUDINARY_API_SECRET. Don't forget to add that to your .env file.",
      {
        status: 401,
      },
    );
  }

  console.log(req);

  //const fileDataUrl = await req.text();

  try {
    /*const uploadResponse = await cloudinary.uploader.upload(
      fileDataUrl,
      options,
    );

    return NextResponse.json({
      files: [
        {
          url: uploadResponse.secure_url,
          key: uploadResponse.public_id,
          name: uploadResponse.public_id,
        },
      ],
    });*/
    return NextResponse.json({
      status: 200,
    });
  } catch (error) {
    console.log("Error occurred ", error);
    return NextResponse.json({ errors: { root: [error] }, status: 500 });
  }
}
