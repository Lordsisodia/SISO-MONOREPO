export type ClassValue = string | number | boolean | null | undefined | ClassValue[];

const flatten = (values: ClassValue[]): string[] => values.flatMap((val) => {
  if (Array.isArray(val)) return flatten(val);
  if (typeof val === "string" || typeof val === "number") return val ? [String(val)] : [];
  if (val) return [String(val)];
  return [];
});

export function cx(...values: ClassValue[]): string {
  return flatten(values).join(" ").trim();
}

type VariantDefinitions = Record<string, Record<string, string>>;
type CompoundVariant = { variants: Record<string, string | string[]>; class: string };

interface Config {
  variants?: VariantDefinitions;
  defaultVariants?: Record<string, string>;
  compoundVariants?: CompoundVariant[];
}

export function cva(base?: string, config: Config = {}) {
  return (variants: Record<string, string | undefined> = {}, opts: { class?: string } = {}) => {
    const classes: ClassValue[] = [base];

    if (config.variants) {
      for (const [variantName, definition] of Object.entries(config.variants)) {
        const selected = variants[variantName] ?? config.defaultVariants?.[variantName];
        if (selected && definition[selected]) {
          classes.push(definition[selected]);
        }
      }
    }

    if (config.compoundVariants) {
      config.compoundVariants.forEach((compound) => {
        const matches = Object.entries(compound.variants).every(([variantName, expected]) => {
          const selected = variants[variantName] ?? config.defaultVariants?.[variantName];
          return Array.isArray(expected) ? expected.includes(selected ?? "") : expected === selected;
        });
        if (matches) classes.push(compound.class);
      });
    }

    if (opts.class) classes.push(opts.class);

    return cx(...classes);
  };
}

export type VariantProps<T> = T extends (...args: any) => any ? NonNullable<Parameters<T>[0]> : never;
