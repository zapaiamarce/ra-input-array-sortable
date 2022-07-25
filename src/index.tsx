import React, { cloneElement } from "react";
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from "react-sortable-hoc";
import arrayMove from "array-move";
import { useInput, useRecordContext } from "react-admin";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import Typography from "@material-ui/core/Typography";
import AddCircleIcon from "@material-ui/icons/AddCircle";

const DragHandle = SortableHandle(() => (
  <DragIndicatorIcon
    color="disabled"
    style={{ cursor: "move" }}
    fontSize="large"
  />
));

const SortableItem = SortableElement(
  ({ onRemove, label, baseSource, fields }) => {
    const children = [].concat(fields);
    return (
      <div style={{ padding: "20px 0", display: "flex" }}>
        <Typography variant="caption">{label}</Typography>
        <DragHandle />
        <div style={{ width: "100%" }}>
          {children.map((field) => (
            <div style={{ padding: 5 }}>
              {cloneElement(field, {
                ...field.props,
                source: baseSource + "." + label + "." + field.props.source,
              })}
            </div>
          ))}
        </div>
        <HighlightOffIcon color="error" onClick={onRemove} />
      </div>
    );
  }
);

const SortableList = SortableContainer(
  ({ items, onRemoveItem, baseSource, fields }) => {
    return (
      <div>
        <style
          dangerouslySetInnerHTML={{ __html: `.sortableHelper{ z-index:10; }` }}
        ></style>
        {items &&
          items.map((value, index) => (
            <SortableItem
              key={`item-${index}`}
              baseSource={baseSource}
              fields={fields}
              index={index}
              label={index}
              onRemove={() => onRemoveItem(index)}
            />
          ))}
      </div>
    );
  }
);

export default function Sortable(props) {
  const input = useInput(props);

  const {
    field: { name, onChange, value: items, ...rest },
    fieldState: { isTouched, error },
    isRequired,
  } = input;
  const { source, children: fields } = props;
  const { label } = props;

  const onSortEnd = ({ oldIndex, newIndex }) => {
    onChange(arrayMove(items, oldIndex, newIndex));
  };

  const onRemoveItem = (index) => {
    console.log("remove");
    items.splice(index, 1);
    onChange([...items]);
  };

  const addEmpty = () => {
    const baseItems = items || [];
    if (fields.length) {
      onChange(baseItems.concat({}));
    } else {
      onChange(baseItems.concat(null));
    }
  };

  return (
    <div style={{ padding: "20px 0" }}>
      <Typography variant="h6">{label || source}</Typography>
      <SortableList
        useDragHandle
        items={items}
        baseSource={source}
        fields={fields}
        helperClass="sortableHelper"
        onSortEnd={onSortEnd}
        onRemoveItem={onRemoveItem}
      />
      <Typography variant="body1">
        <AddCircleIcon onClick={addEmpty} /> Add
      </Typography>
      <hr />
    </div>
  );
}
