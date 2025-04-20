import Coupon from "../models/coupon.js";
import { fn, col, where } from "sequelize";

const getCouponByCode = async (code) => {
  try {
    const coupon = await Coupon.findOne({
      where: where(fn("LOWER", col("code")), "=", code.toLowerCase()),
    }, { raw: true });

    return coupon;
  } catch (error) {
    throw error;
  }
};

export default { getCouponByCode };
