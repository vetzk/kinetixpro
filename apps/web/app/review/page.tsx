"use client";
import { Button } from "@/components/ui/button";
import { FormContext } from "../contexts/FormContext";
import * as React from "react";
import apiCall from "@/helper/apiCall";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface IReviewProps {}

const Review: React.FunctionComponent<IReviewProps> = (props) => {
  const { form, setFormReview } = React.useContext(FormContext);
  const router = useRouter();
  const handleSubmitForm = async () => {
    try {
      const { data } = await apiCall.post("/api/form/submitdata", {
        name: form?.name,
        email: form?.email,
        address: form?.address,
        gender: form?.gender,
        hobby: form?.hobby,
        phoneNumber: form?.phoneNumber,
      });

      setFormReview({
        name: "",
        address: "",
        email: "",
        phoneNumber: "",
        hobby: "",
        gender: "",
      });

      toast("Data submit success", { onClose: () => router.replace("/") });
    } catch (error) {
      console.log(error);
      toast("Error submitting data");
    }
  };
  return (
    <div className="w-full flex flex-col gap-10 p-10">
      <ToastContainer />
      <div className="w-full flex justify-center items-center">
        <p className="text-5xl">Review Your Data</p>
      </div>
      <div className="w-full flex flex-col justify-center items-center gap-5">
        <p>
          <strong>Full Name:</strong> {form?.name}
        </p>
        <p>
          <strong>Email:</strong> {form?.email}
        </p>
        <p>
          <strong>Address:</strong> {form?.address}
        </p>
        <p>
          <strong>Phone Number:</strong> {form?.phoneNumber}
        </p>
        <p>
          <strong>Gender:</strong> {form?.gender}
        </p>
        <p>
          <strong>Hobby:</strong> {form?.hobby}
        </p>
      </div>

      <div className="flex justify-center items-center">
        <Button className="animated-button w-1/2" onClick={handleSubmitForm}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Review;
