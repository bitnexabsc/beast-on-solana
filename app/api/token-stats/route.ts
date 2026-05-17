import { NextResponse } from "next/server";
export async function GET() {
  return NextResponse.json({
    marketCap: "$247,890",
    liquidity: "$18,400",
    supply: "1,000,000,000",
    burned: "42,069,000",
    holders: 1247,
    bondingCurvePercent: 23,
    price: "$0.000248",
  });
}
