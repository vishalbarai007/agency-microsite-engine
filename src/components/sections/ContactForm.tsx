"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { contactFormSchema, ContactFormData } from "@/types/formSchemas";
import { submitContactForm } from "@/app/actions/submitContactForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const serviceOptions = [
  "Turnkey Residential Villas",
  "Spatial 3D Planning & Permits",
  "Interior Curation & Styling",
  "Duplex Penthouse Architecture",
  "General Commission Inquiry"
];

export function ContactForm() {
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      service: serviceOptions[0],
      message: "",
      honeypot: ""
    }
  });

  const onSubmit = (formData: ContactFormData) => {
    startTransition(async () => {
      const result = await submitContactForm(formData);
      if (result.success) {
        toast.success(result.message);
        reset();
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-xl mx-auto w-full">
      {/* Invisible Honeypot anti-spam trap */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="opacity-0 absolute -z-50 pointer-events-none h-0 w-0"
        {...register("honeypot")}
      />

      {/* Full Name */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
          Your Name <span className="text-[#C5A880]">*</span>
        </label>
        <Input
          placeholder="e.g. Vikram Singhania"
          disabled={isPending}
          {...register("fullName")}
          className={errors.fullName ? "border-red-500" : ""}
        />
        {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName.message}</p>}
      </div>

      {/* Email & Phone Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
            Email Address <span className="text-[#C5A880]">*</span>
          </label>
          <Input
            type="email"
            placeholder="vikram@singhania.com"
            disabled={isPending}
            {...register("email")}
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
            Phone Number (Optional)
          </label>
          <Input
            type="tel"
            placeholder="+91 98200 00000"
            disabled={isPending}
            {...register("phone")}
            className={errors.phone ? "border-red-500" : ""}
          />
          {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
        </div>
      </div>

      {/* Service Selection */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
          Area of Interest <span className="text-[#C5A880]">*</span>
        </label>
        <select
          disabled={isPending}
          {...register("service")}
          className="w-full h-11 px-3 rounded-md bg-slate-900 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
        >
          {serviceOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        {errors.service && <p className="text-red-400 text-xs mt-1">{errors.service.message}</p>}
      </div>

      {/* Message */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
          Project Brief &amp; Location <span className="text-[#C5A880]">*</span>
        </label>
        <Textarea
          rows={4}
          placeholder="Describe your site location, square footage, and target completion timeline..."
          disabled={isPending}
          {...register("message")}
          className={errors.message ? "border-red-500" : ""}
        />
        {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isPending}
        variant="gold"
        className="w-full h-13 text-xs uppercase tracking-widest font-bold"
      >
        {isPending ? "Transmitting Commission..." : "Transmit Inquiry"}
      </Button>
    </form>
  );
}
