import { useApi } from "@/hooks/useApi";
import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";

const EmailConfirmPage = () => {
  const { confirmationToken } = useParams();
  const [emailConfirmed, setEmailConfirmed] = useState(0);

  const api = useApi();

  api
    .get(`emailConfirm/${confirmationToken}`)
    .then((result) => {
      if (result.request.status === 200) {
        setEmailConfirmed(1);
      }
    })
    .catch(() => {
      setEmailConfirmed(2);
    });

  return (
    <>
      {emailConfirmed === 1 && <Navigate to="/login" replace={true} />}
      {emailConfirmed === 2 && <Navigate to="/error-page" replace={true} />}
    </>
  );
};

export default EmailConfirmPage;
