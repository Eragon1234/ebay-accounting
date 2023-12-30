import {ReactNode} from 'react';

import "./table.css";

type TableProps<D extends Record<any, any>> = {
    columns: Column<D, keyof D>[],
    data: D[]
}

type Column<D, K extends keyof D> = K extends any ? {
    header: ReactNode,
    accessor: K,
    render?: (value: D[K]) => ReactNode
} : never;

export default function Table<D extends Record<any, any>>({columns, data}: TableProps<D>) {
    return (
        <table>
            <thead>
            <tr>
                {columns.map((column, i) => (
                    <th key={i}>
                        {column.header}
                    </th>
                ))}
            </tr>
            </thead>
            <tbody>
            {data.map((item, index: number) => (
                <tr key={index}>
                    {columns.map((column, i) => (
                        <td key={i}>
                            {render(column, item[column.accessor as keyof typeof item])}
                        </td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    );
}

function render<D>(column: Column<D, keyof D>, val: any): ReactNode {
    if (column.render) {
        return column.render(val)
    }
    return val
}