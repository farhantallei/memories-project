import { Form } from "@remix-run/react";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";
import { LinkIcon } from "lucide-react";
import { cn } from "~/lib/utils";
import useFormSubmission from "~/hooks/use-form-submission";
import { actions, postAtom } from "~/services/post";
import { useAtom } from "jotai";

function FormPost() {
  const [postState, setPostState] = useAtom(postAtom);

  const { formRef, firstInputRef, errors, state } = useFormSubmission(
    postState.id != null ? actions.UPDATE_POST : actions.CREATE_POST,
    {
      onSuccess: () =>
        setPostState({
          id: undefined,
          creator: "",
          title: "",
          message: "",
          tags: "",
          selected_file: "",
        }),
    }
  );

  return (
    <Form ref={formRef} replace className="space-y-2" method="post">
      <h2 className="text-xl font-semibold">{postState.id != null ? "Perbarui" : "Buat"} Memori</h2>
      {postState.id != null && (
        <input type="hidden" name="id" value={postState.id} />
      )}
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
          value={postState.creator}
          onChange={(e) =>
            setPostState({ ...postState, creator: e.target.value })
          }
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
          value={postState.title}
          onChange={(e) =>
            setPostState({ ...postState, title: e.target.value })
          }
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
          value={postState.message}
          onChange={(e) =>
            setPostState({ ...postState, message: e.target.value })
          }
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
          value={postState.tags}
          onChange={(e) => setPostState({ ...postState, tags: e.target.value })}
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
            value={postState.selected_file}
            onChange={(e) =>
              setPostState({ ...postState, selected_file: e.target.value })
            }
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
      <div className="flex space-x-2">
        <Button
          name="_action"
          value={
            postState.id != null ? actions.UPDATE_POST : actions.CREATE_POST
          }
          type="submit"
          disabled={state === "submitting"}
          className="w-full"
        >
          {postState.id != null ? "Perbarui" : "Upload"} Memori
        </Button>
        {postState.id != null && (
          <Button
            variant="outline"
            type="button"
            onClick={() => {
              setPostState({
                id: undefined,
                creator: "",
                title: "",
                message: "",
                tags: "",
                selected_file: "",
              });
            }}
          >
            Batal
          </Button>
        )}
      </div>
    </Form>
  );
}

export default FormPost;
