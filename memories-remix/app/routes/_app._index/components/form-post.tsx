import { Form, useActionData, useNavigation } from "@remix-run/react";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";
import { LinkIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "~/lib/utils";

function FormPost() {
  const actionData = useActionData<
    | ["error" | "success"]
    | ["error", { [k: string]: [string, ...string[]] | undefined }]
  >();
  const navigation = useNavigation();

  const formRef = useRef<HTMLFormElement>(null);
  const creatorRef = useRef<HTMLInputElement>(null);

  const [prevNavState, setPrevNavState] = useState(navigation.state);
  const [errors, setErrors] = useState<{
    [k: string]: [string, ...string[]] | undefined;
  }>();

  useEffect(() => {
    if (prevNavState === "submitting") {
      if (actionData?.[0] === "error") {
        const errors = actionData[1];

        if (errors) {
          setErrors(errors);
        } else {
          alert("Gagal membuat memori");
          setErrors(undefined);
        }
      } else {
        formRef.current?.reset();
        setErrors(undefined);
      }

      creatorRef.current?.focus();
    }
    setPrevNavState(navigation.state);
  }, [navigation.state]);

  return (
    <Form ref={formRef} replace className="space-y-2" method="post">
      <h2 className="text-xl font-semibold">Buat Memori</h2>
      <div>
        <Label
          htmlFor="creator"
          className={cn(errors?.creator && "text-destructive")}
        >
          Pembuat
        </Label>
        <Input
          ref={creatorRef}
          id="creator"
          name="creator"
          className={cn(
            errors?.creator &&
              "border border-destructive focus-visible:ring-destructive"
          )}
        />
        {errors?.creator && (
          <p className="text-destructive text-sm">{errors.creator[0]}</p>
        )}
      </div>
      <div>
        <Label
          htmlFor="title"
          className={cn(errors?.title && "text-destructive")}
        >
          Judul
        </Label>
        <Input
          id="title"
          name="title"
          className={cn(
            errors?.title &&
              "border border-destructive focus-visible:ring-destructive"
          )}
        />
        {errors?.title && (
          <p className="text-destructive text-sm">{errors.title[0]}</p>
        )}
      </div>
      <div>
        <Label
          htmlFor="message"
          className={cn(errors?.message && "text-destructive")}
        >
          Konten
        </Label>
        <Textarea
          id="message"
          name="message"
          className={cn(
            errors?.message &&
              "border border-destructive focus-visible:ring-destructive"
          )}
        />
        {errors?.message && (
          <p className="text-destructive text-sm">{errors.message[0]}</p>
        )}
      </div>
      <div>
        <Label
          htmlFor="selected_file"
          className={cn(errors?.selected_file && "text-destructive")}
        >
          URL Gambar
        </Label>
        <div className="relative">
          <Input
            id="selected_file"
            type="url"
            name="selected_file"
            className={cn(
              "peer ps-9",
              errors?.selected_file &&
                "border border-destructive focus-visible:ring-destructive"
            )}
          />
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
            <LinkIcon size={16} strokeWidth={2} aria-hidden="true" />
          </div>
        </div>
        {errors?.selected_file && (
          <p className="text-destructive text-sm">{errors.selected_file[0]}</p>
        )}
      </div>
      <Button
        type="submit"
        disabled={navigation.state === "submitting"}
        className="w-full"
      >
        Upload
      </Button>
    </Form>
  );
}

export default FormPost;
