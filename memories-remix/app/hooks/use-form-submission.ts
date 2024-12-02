import { useActionData, useNavigation } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";

export default function useFormSubmission(
  action: string,
  props?: { onSuccess?: () => void }
) {
  const actionData = useActionData<
    | ["error" | "success"]
    | ["error", { [k: string]: [string, ...string[]] | undefined }]
  >();
  const navigation = useNavigation();

  const formRef = useRef<HTMLFormElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  const [prevNavState, setPrevNavState] = useState(navigation.state);
  const [errors, setErrors] = useState<{
    [k: string]: [string, ...string[]] | undefined;
  }>();

  useEffect(() => {
    if (navigation.formData?.get("_action") === action) {
      if (prevNavState === "submitting") {
        if (actionData?.[0] === "error") {
          const errors = actionData[1];

          if (errors) {
            setErrors(errors);
          } else {
            alert("Gagal menyimpan data.");
            setErrors(undefined);
          }
        } else {
          formRef.current?.reset();
          props?.onSuccess?.();
          setErrors(undefined);
        }

        firstInputRef.current?.focus();
      }
      setPrevNavState(navigation.state);
    }
  }, [navigation.state]);

  return { formRef, firstInputRef, errors, state: prevNavState };
}
