import { Controller, Get } from "@nestjs/common";
import * as fs from "node:fs";
import * as path from "node:path";
import * as readline from "node:readline";

@Controller('day4')
export class Day4Controller {

    readonly limitAdjacentRollPaper: number = 4;
    readonly rollSymbol = '@';

    async forEachLineStream(path:string, callback: (prev: string|null, current: string|null, next: string|null, index: number, isLast: boolean) => void) {
        const readLine = readline.createInterface({
            input: fs.createReadStream(path),
            crlfDelay: Infinity,
        });

        let buffer: (string|null)[] = [null, null, null];
        let index = -1;

        for await (const line of readLine) {
            index++;
            if(index === 0) {
                buffer = [null, line, null];
                continue;
            }
            //
            if(index === 1) {
                buffer[2] = line;
                callback(buffer[0], buffer[1]!, buffer[2], 0, false);
                buffer = [buffer[1], buffer[2], null];
                continue;
            }
            //
            buffer[2] = line; // new next
            callback(buffer[0], buffer[1]!, buffer[2], index - 1, false);
            buffer = [buffer[1], buffer[2], null];
        }

        if (index >= 0) {
            const lastIndex = index;
            callback(buffer[0], buffer[1]!, null, lastIndex, true);
        }
    }
    @Get()
    async countFreeRollOfPaper(): Promise<number> {
        let accessibleRollPaper = 0;
        const filePath = path.join(process.cwd(), 'dist', 'assets', 'day4_input.txt');
        await this.forEachLineStream(filePath, (p, c, n, i, isLast) => {
            let freeRollForCurrentLine = this.countFreeRollPaperPerLine(p,c,n,i);
            accessibleRollPaper += freeRollForCurrentLine;
        });
        return accessibleRollPaper;
    }

    countFreeRollPaperPerLine(p:string|null, c:string|null, n:string|null, idx: number): number {
        let freeRollPerLine = 0;
        if(c !== null) {
            for (let i=0;i<c.length; i++) {
                let count = 0;
                if(c[i] === this.rollSymbol) {
                    // Top (previous line)
                    if(p !== null) {
                        count += p[i-1] && (p[i-1] === this.rollSymbol) ? 1 : 0;
                        count += p[i] === this.rollSymbol ? 1 : 0;
                        count += p[i+1] && (p[i+1] === this.rollSymbol) ? 1 : 0;
                    }
                    // Left and right (current line)
                    count += c[i-1] && (c[i-1] === this.rollSymbol) ? 1 : 0;
                    count += c[i+1] && (c[i+1] === this.rollSymbol) ? 1 : 0;
                    // Bottom (next line)
                    if(n !== null) {
                        count += n[i-1] && (n[i-1] === this.rollSymbol) ? 1 : 0;
                        count += n[i] === this.rollSymbol ? 1 : 0;
                        count += n[i+1] && (n[i+1] === this.rollSymbol) ? 1 : 0;
                    }
                    if(count < this.limitAdjacentRollPaper) {
                        freeRollPerLine++;
                    }
                }
            }
        }
        return freeRollPerLine;
    }
}