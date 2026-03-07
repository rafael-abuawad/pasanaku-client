import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export function GameCard() {
  return (
    <Card className="relative mx-auto w-full pt-0">
      <div className="absolute inset-0 z-30 aspect-square bg-black/35" />
      <img
        src="https://avatar.vercel.sh/shadcn1"
        alt="Event cover"
        className="relative z-20 aspect-square w-full object-cover brightness-60 grayscale dark:brightness-40"
      />

      <CardHeader>
        <CardTitle>Pasanaku #10</CardTitle>
      </CardHeader>
      <CardContent>
        <Badge variant="outline">crvUSD</Badge>
        <Badge variant="outline">1000</Badge>
        <Badge variant="outline">12</Badge>
      </CardContent>
    </Card>
  );
}
