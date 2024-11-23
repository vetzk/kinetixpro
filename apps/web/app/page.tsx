"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import apiCall from "@/helper/apiCall";
import Image from "next/image";
import { useContext, useState } from "react";
import { FormContext } from "./contexts/FormContext";
import { useRouter } from "next/navigation";

type User = {
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  gender: string;
  hobby: string;
};

export default function Home() {
  const [form, setForm] = useState<User>({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    gender: "",
    hobby: "",
  });

  const router = useRouter();

  const { setFormReview } = useContext(FormContext);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!form.name) {
      newErrors.name = "Name is required.";
    } else if (!/^[a-zA-Z\s]+$/.test(form.name)) {
      newErrors.name = "Name must contain only alphabets.";
    }

    if (!form.email) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) // Regex for email validation
    ) {
      newErrors.email = "Invalid email format.";
    }

    if (!form.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required.";
    } else if (!/^\d+$/.test(form.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must contain only numbers.";
    }

    if (!form.address) {
      newErrors.address = "Address is required.";
    }

    if (!form.gender) {
      newErrors.gender = "Gender is required.";
    }

    if (!form.hobby) {
      newErrors.hobby = "Hobby is required.";
    } else if (!/^[a-zA-Z\s]+$/.test(form.hobby)) {
      newErrors.hobby = "Hobby must contain only alphabets.";
    }

    setErrors(newErrors);

    // Return true if there are no errors
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitForm = async () => {
    if (!validateForm()) return;

    try {
      //   const { data } = await apiCall.post("/submitdata", {
      //     name: form.name,
      //     email: form.email,
      //     address: form.address,
      //     gender: form.gender,
      //     hobby: form.hobby,
      //     phoneNumber: form.phoneNumber,
      //   });

      //   setForm({
      //     name: "",
      //     address: "",
      //     email: "",
      //     phoneNumber: "",
      //     hobby: "",
      //     gender: "",
      //   });
      setErrors({});
      setFormReview({
        email: form.email,
        address: form.address,
        phoneNumber: form.phoneNumber,
        gender: form.gender,
        hobby: form.hobby,
        name: form.name,
      });

      router.push("/review");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative w-full min-h-screen">
      {/* Form Content */}
      <div className="w-full px-4 sm:px-6 md:px-10 py-10 relative z-10">
        <div className="w-full flex flex-col justify-center items-center gap-5">
          <div className="w-full flex justify-center items-center">
            <p className="text-3xl sm:text-4xl md:text-5xl font-bold  text-center">
              FORM FIELD
            </p>
          </div>

          {/* Form Fields */}
          <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/3 flex flex-col gap-5">
            {/* Name Field */}
            <div className="flex flex-col gap-2">
              <Label className="animated-label ">Full Name</Label>
              <Input
                placeholder="Full Name"
                className="animated-input w-full"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              {errors.name && <p className="error-message">{errors.name}</p>}
            </div>

            {/* Email Field */}
            <div className="flex flex-col gap-2">
              <Label className="animated-label ">Email</Label>
              <Input
                placeholder="Email"
                className="animated-input w-full"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              {errors.email && <p className="error-message">{errors.email}</p>}
            </div>

            {/* Phone Number Field */}
            <div className="flex flex-col gap-2">
              <Label className="animated-label ">Phone Number</Label>
              <Input
                placeholder="Phone Number"
                className="animated-input w-full"
                value={form.phoneNumber}
                onChange={(e) =>
                  setForm({ ...form, phoneNumber: e.target.value })
                }
              />
              {errors.phoneNumber && (
                <p className="error-message">{errors.phoneNumber}</p>
              )}
            </div>

            {/* Address Field */}
            <div className="flex flex-col gap-2">
              <Label className="animated-label ">Address</Label>
              <Input
                placeholder="Address"
                className="animated-input w-full"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
              />
              {errors.address && (
                <p className="error-message">{errors.address}</p>
              )}
            </div>

            {/* Gender Field */}
            <div className="flex flex-col gap-2">
              <Label className="animated-label ">Gender</Label>
              <Select
                onValueChange={(e) => setForm({ ...form, gender: e })}
                value={form.gender}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectContent>
              </Select>
              {errors.gender && (
                <p className="error-message">{errors.gender}</p>
              )}
            </div>

            {/* Hobby Field */}
            <div className="flex flex-col gap-2">
              <Label className="animated-label ">Hobby</Label>
              <Input
                placeholder="Hobby"
                className="animated-input w-full"
                value={form.hobby}
                onChange={(e) => setForm({ ...form, hobby: e.target.value })}
              />
              {errors.hobby && <p className="error-message">{errors.hobby}</p>}
            </div>

            {/* Submit Button */}
            <div>
              <Button
                className="animated-button w-full"
                onClick={handleSubmitForm}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
