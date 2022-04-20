import { ClassNames } from "@emotion/react";
import { Button, CardContent, Card } from "@mui/material";
import React from "react";
import PhraseDialog from "./PhraseDialog";
interface CreateNewWalletProps {}

const CreateNewWallet: React.FC<CreateNewWalletProps> = () => {
  return (
    <div className="flex h-screen m-auto">
      <Card className="w-1/2 m-auto">
        <CardContent>
          {" "}
          <div className="flex items-center justify-center flex-col m-auto ">
            <h1 className="text-2xl font-bold mb-5">
              Create new Secret Recovery Phrase
            </h1>
            <div className="flex flex-col items-center justify-center my-5 w-full">
              <p className="text-center my-6 font-semibold text-lg">
                Your Secret Recovery Phrase makes it easy to back up and restore
                your account{" "}
              </p>
              <p className="text-center text-gray mb-5 italic w-1/2">
                WARNING Never disclose your Secret Phrase. Anyone with this
                Phrase can take your 5ire coins forever ❗❗❗
              </p>
              <div className="w-full flex justify-center">
                <PhraseDialog />
              </div>
            </div>
            <div className="flex items-start w-full justify-start">
              <div>
                <h2 className="text-lg font-semibold mb-4">
                  Tips on storing it safely
                </h2>
                <ul>
                  <li>&#128204; Save a backup in multiple places.</li>
                  <li>&#128204; Never share the phrase with anyone.</li>
                  <li>&#128204; Be careful of phishing!</li>
                </ul>

                <p className="italic mt-5">
                  We cannot recover your Secret Recovery Phrase.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateNewWallet;
