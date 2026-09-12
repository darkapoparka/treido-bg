"use client";
/* eslint-disable @next/next/no-img-element */
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { Catalog } from "../catalog/types";
import { Sheet, consumeSheetHistory } from "./components";
import { CollectionEditor } from "./collection-editor";
import { Icon } from "./icons";
import { useDiscovery } from "./state";
import "./first-collection.css";

/** This is triggered by a real first save, never by a screenshot/frame parameter.
 * Dismissing the suggestion does not undo the save or create a collection. */
export function FirstCollectionPrompt({ catalog }: { catalog: Catalog }) {
  const state = useDiscovery();
  const router = useRouter();
  const [startedEmpty] = useState(() => state.saved.length === 0);
  const [dismissed, setDismissed] = useState(false);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [visibility, setVisibility] = useState<"Private" | "Public">("Private");
  const submitting = useRef(false);
  const first = catalog.products.find((item) => item.id === state.saved[0]);
  const suggest =
    startedEmpty && !dismissed && !!first && state.collections.length === 0;
  function close() {
    setDismissed(true);
    setEditing(false);
  }
  return (
    <Sheet
      open={editing || suggest}
      title={editing ? "Create collection" : "Start your first collection"}
      headerless
      className={
        editing ? "saved-sheet collection-editor" : "first-collection-sheet"
      }
      initialFocus={
        editing ? ".collection-name-input" : ".first-collection-create"
      }
      onClose={close}
    >
      {editing ? (
        <CollectionEditor
          name={name}
          visibility={visibility}
          onNameChange={setName}
          onVisibilityChange={setVisibility}
          onCancel={close}
          onSave={() => {
            if (!name.trim() || submitting.current) return;
            submitting.current = true;
            const id = state.createCollection(name.trim());
            state.updateCollection(id, { visibility });
            const consumed = consumeSheetHistory();
            close();
            // The same Saved selection UI handles the new collection. Its Done
            // action replaces this entry, rather than stacking duplicate pages.
            (consumed ? router.replace : router.push)(
              `/saved?collection=${encodeURIComponent(id)}&view=add`,
            );
          }}
        />
      ) : (
        <>
          <div className="first-collection-art" aria-hidden="true">
            <span />
            <span />
            <div>
              {first && <img src={first.images[0]} alt="" />}
              <i>
                <Icon name="heart" filled />
              </i>
            </div>
          </div>
          <h2>Start your first collection</h2>
          <p>
            Organize your saved items to revisit later or share with others.
          </p>
          <button
            className="primary first-collection-create"
            onClick={() => setEditing(true)}
          >
            Create collection
          </button>
        </>
      )}
    </Sheet>
  );
}
