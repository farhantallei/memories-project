import { Form } from "@remix-run/react";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";
import { LinkIcon } from "lucide-react";
import { cn } from "~/lib/utils";
import useFormSubmission from "~/hooks/use-form-submission";
import { actions } from "~/services/post";

function FormPost() {
  const { formRef, firstInputRef, errors, state } = useFormSubmission(
    actions.CREATE_POST
  );

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
          ref={firstInputRef}
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
          htmlFor="tags"
          className={cn(errors?.tags && "text-destructive")}
        >
          Tag{" "}
          <span className="text-muted-foreground font-normal">(opsional)</span>
        </Label>
        <Input
          id="tags"
          name="tags"
          className={cn(
            errors?.tags &&
              "border border-destructive focus-visible:ring-destructive"
          )}
        />
        <p className="text-sm text-muted-foreground">
          Gunakan koma (,) untuk memisahkan tag. Contoh:{" "}
          <code>remix, react</code>
        </p>
        {errors?.tags && (
          <p className="text-destructive text-sm">{errors.tags[0]}</p>
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
        name="_action"
        value={actions.CREATE_POST}
        type="submit"
        disabled={state === "submitting"}
        className="w-full"
      >
        Upload
      </Button>
    </Form>
  );
}

export default FormPost;
