import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction, DeployResult } from "hardhat-deploy/types"

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, network } = hre
  const { deploy } = deployments

  const { deployer } = await getNamedAccounts()

  const NAME = "Chainlink Workshop 0x1"
  const SYMBOL = "CW0x1"
  const BADGE_NAME = "Chainlink workshop #1"
  const BADGE_DESCRIPTION = "First time chainlink workshop"

  const deploymentName = "Badge"

  const result: DeployResult = await deploy(deploymentName, {
    contract: "Badge",
    from: deployer,
    args: [NAME, SYMBOL, BADGE_NAME, BADGE_DESCRIPTION],
    log: true,
    waitConfirmations: 6,
  })

  console.log("Result deployed at contract : ", result.address)

  if (network.name != "hardhat") {
    try {
      await hre.run("verify:verify", {
        address: result.address,
        constructorArguments: [NAME, SYMBOL, BADGE_NAME, BADGE_DESCRIPTION],
      })
    } catch (err) {
      console.log(err)
    }
  }
}

export default func
func.tags = ["Badge"]
