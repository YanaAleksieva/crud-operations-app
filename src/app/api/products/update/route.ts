// import { NextApiRequest, NextApiResponse } from "next";

// export default function POST(req: NextApiRequest, res: NextApiResponse) {
//   res.setHeader('Allow', ['POST']);
//     if (req.method === 'POST') {
//       const { productId } = req.body;
  
//       console.log(`Removing product with ID: ${productId}`);
  
//       res.status(200).json({ success: true, message: 'Product removed successfully' });
//     } else {
//       console.log('here')
//       res.setHeader('Allow', ['POST']);
//       res.status(405).end(`Method ${req.method} Not Allowed`);
//     }
//   }

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  return NextResponse.json({ message: "Success" });
}