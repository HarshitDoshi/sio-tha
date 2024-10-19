type IShellProperties = {
  showHeaderAndFooter: boolean;
  children?: React.ReactNode | undefined;
};

type ITabPanel = {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export type { IShellProperties, ITabPanel };