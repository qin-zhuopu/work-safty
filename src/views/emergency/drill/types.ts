export interface DrillType {
  id: number;
  name: string;
  company: any;
}

export interface DrillItem {
  id: number;
  title: string;
  content: string;
  planTime: string;
  remarks: string;
  drillType: DrillType;
}
