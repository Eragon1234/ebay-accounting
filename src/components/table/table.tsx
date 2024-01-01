import {ReactNode} from 'react';

import "./table.css";

type TableProps<D extends Record<any, any>> = {
    columns: Column<D>[],
    data: D[]
}

type Column<D> = {
    header: ReactNode,
    render: (value: D) => ReactNode
}

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
                            {column.render(item)}
                        </td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    );
}
