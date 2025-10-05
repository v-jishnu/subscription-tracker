import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    currency: { type: String, required: true },
    frequency: {
      type: String,
      enum: ["daily", "weekly", "monthly", "yearly"],
      default: "monthly",
    },
    startDate: { type: Date, required: true },
    renewalDate: { type: Date },   // 👈 added field
    paymentMethod: { type: String },
    category: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

// Auto-calculate renewalDate before saving
subscriptionSchema.pre("save", function (next) {
  if (this.startDate && this.frequency) {
    const renewal = new Date(this.startDate);

    switch (this.frequency) {
      case "daily":
        renewal.setDate(renewal.getDate() + 1);
        break;
      case "weekly":
        renewal.setDate(renewal.getDate() + 7);
        break;
      case "monthly":
        renewal.setMonth(renewal.getMonth() + 1);
        break;
      case "yearly":
        renewal.setFullYear(renewal.getFullYear() + 1);
        break;
    }

    this.renewalDate = renewal; // 👈 save calculated date
  }
  next();
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
