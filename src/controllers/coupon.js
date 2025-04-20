import  { couponService } from "../services/index.js";

const getCouponByCode = async (req, res) => {
  const { code } = req.params;

  try {
    const coupon = await couponService.getCouponByCode(code);

    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }
    
    res.status(200).json(coupon.dataValues);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}


export default { getCouponByCode };