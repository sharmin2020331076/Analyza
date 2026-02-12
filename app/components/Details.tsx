import { cn } from "~/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
} from "./Accordion";

const ScoreBadge = ({ score }: { score: number }) => {
  return (
      <div
          className={cn(
              "flex flex-row gap-1 items-center px-3 py-1 rounded-full border",
              score > 69
                  ? "bg-green-500/10 border-green-500/20"
                  : score > 39
                      ? "bg-yellow-500/10 border-yellow-500/20"
                      : "bg-red-500/10 border-red-500/20"
          )}
      >
        <img
            src={score > 69 ? "/icons/check.svg" : "/icons/warning.svg"}
            alt="score"
            className="size-4 opacity-80"
             style={{ filter: score > 69 ? "sepia(1) hue-rotate(90deg) saturate(300%)" : "sepia(1) hue-rotate(0deg) saturate(300%)" }}
        />
        <p
            className={cn(
                "text-xs font-semibold",
                score > 69
                    ? "text-green-400"
                    : score > 39
                        ? "text-yellow-400"
                        : "text-red-400"
            )}
        >
          {score}/100
        </p>
      </div>
  );
};

const CategoryHeader = ({
                          title,
                          categoryScore,
                        }: {
  title: string;
  categoryScore: number;
}) => {
  return (
      <div className="flex flex-row gap-4 items-center py-2 w-full justify-between">
        <p className="text-xl font-medium text-white">{title}</p>
        <ScoreBadge score={categoryScore} />
      </div>
  );
};

const CategoryContent = ({
                           tips,
                         }: {
  tips: { type: "good" | "improve"; tip: string; explanation: string }[];
}) => {
  return (
      <div className="flex flex-col gap-4 items-center w-full pt-2 pb-6">
        <div className="bg-white/5 w-full rounded-xl px-5 py-4 grid grid-cols-1 md:grid-cols-2 gap-4 border border-white/5">
          {tips.map((tip, index) => (
              <div className="flex flex-row gap-3 items-start" key={index}>
                <img
                    src={
                      tip.type === "good" ? "/icons/check.svg" : "/icons/warning.svg"
                    }
                    alt="score"
                    className="size-5 mt-0.5 opacity-80"
                     style={{ filter: tip.type === "good" ? "sepia(1) hue-rotate(90deg) saturate(300%)" : "sepia(1) hue-rotate(0deg) saturate(300%)" }}
                />
                <p className="text-base text-text-secondary leading-snug">{tip.tip}</p>
              </div>
          ))}
        </div>
        <div className="flex flex-col gap-4 w-full">
          {tips.map((tip, index) => (
              <div
                  key={index + tip.tip}
                  className={cn(
                      "flex flex-col gap-2 rounded-2xl p-5 border",
                      tip.type === "good"
                          ? "bg-green-500/5 border-green-500/10 text-green-300"
                          : "bg-yellow-500/5 border-yellow-500/10 text-yellow-300"
                  )}
              >
                <div className="flex flex-row gap-3 items-center">
                  <img
                      src={
                        tip.type === "good"
                            ? "/icons/check.svg"
                            : "/icons/warning.svg"
                      }
                      alt="score"
                     className="size-5 opacity-80"
                     style={{ filter: tip.type === "good" ? "sepia(1) hue-rotate(90deg) saturate(300%)" : "sepia(1) hue-rotate(0deg) saturate(300%)" }}
                  />
                  <p className="text-lg font-semibold">{tip.tip}</p>
                </div>
                <p className="text-text-secondary pl-8 text-sm leading-relaxed opacity-90">{tip.explanation}</p>
              </div>
          ))}
        </div>
      </div>
  );
};

const Details = ({ feedback }: { feedback: Feedback }) => {
  return (
      <div className="flex flex-col gap-4 w-full">
        <Accordion>
          <AccordionItem id="tone-style">
            <AccordionHeader itemId="tone-style">
              <CategoryHeader
                  title="Tone & Style"
                  categoryScore={feedback.toneAndStyle.score}
              />
            </AccordionHeader>
            <AccordionContent itemId="tone-style">
              <CategoryContent tips={feedback.toneAndStyle.tips} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem id="content">
            <AccordionHeader itemId="content">
              <CategoryHeader
                  title="Content"
                  categoryScore={feedback.content.score}
              />
            </AccordionHeader>
            <AccordionContent itemId="content">
              <CategoryContent tips={feedback.content.tips} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem id="structure">
            <AccordionHeader itemId="structure">
              <CategoryHeader
                  title="Structure"
                  categoryScore={feedback.structure.score}
              />
            </AccordionHeader>
            <AccordionContent itemId="structure">
              <CategoryContent tips={feedback.structure.tips} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem id="skills">
            <AccordionHeader itemId="skills">
              <CategoryHeader
                  title="Skills"
                  categoryScore={feedback.skills.score}
              />
            </AccordionHeader>
            <AccordionContent itemId="skills">
              <CategoryContent tips={feedback.skills.tips} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
  );
};

export default Details;
