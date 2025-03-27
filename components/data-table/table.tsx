import type { RecipesType } from "@/app/dashboard/[...userId]/page";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Props = {
  recipes: RecipesType[];
};

export function DataTable({ recipes }: Props) {
  return (
    <div className="rounded-xl">
      <Table className="w-full border border-zinc-800 bg-black/40 rounded-xl">
        <TableHeader>
          <TableRow className="border-b border-zinc-800 text-zinc-400 hover:bg-neutral-900/40">
            <TableHead className="w-[100px] text-current">Serial No.</TableHead>
            <TableHead className="text-current">Name</TableHead>
            <TableHead className="text-current">Cooking Time (min)</TableHead>
            <TableHead className="text-current">Difficulty</TableHead>
            <TableHead className="text-current">Cuisine</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recipes && recipes.length > 0 ? (
            recipes.map((item, index) => (
              <TableRow
                key={item.id}
                className="border-b border-zinc-800 text-zinc-300"
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.cookTimeMinutes}</TableCell>
                <TableCell>
                  <p
                    className={`px-3 ${
                      item.difficulty.toLowerCase() === "easy"
                        ? "bg-emerald-500"
                        : item.difficulty.toLowerCase() === "medium"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    } w-fit h-fit text-white rounded`}
                  >
                    {item.difficulty}
                  </p>
                </TableCell>
                <TableCell>{item.cuisine}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-zinc-400">
                No recipes found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
