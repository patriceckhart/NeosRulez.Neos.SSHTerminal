<?php
namespace NeosRulez\Neos\SSHTerminal\Controller;

/*
 * This file is part of the NeosRulez.Neos.SSHTerminal package.
 */

use Neos\Flow\Annotations as Flow;
use Neos\Flow\Mvc\Controller\ActionController;
use Neos\Flow\Mvc\View\JsonView;
use mikehaertl\shellcommand\Command;

class ExecController extends ActionController
{

    /**
     * @var string string
     */
    protected $defaultViewObjectName = JsonView::class;

    /**
     * @var array
     */
    protected $settings;

    /**
     * @param array $settings
     * @return void
     */
    public function injectSettings(array $settings) {
        $this->settings = $settings;
    }

    /**
     * @return void
     */
    public function sendCommandAction():void
    {
        if($this->request->hasArgument('command') && $this->request->getHttpRequest()->getMethod() === 'GET') {
            $commandArgument = base64_decode($this->request->getArgument('command'));
            $rmCommand = strpos($commandArgument, 'rm');
            if($rmCommand === false || $this->settings['safeMode'] === false) {
                $command = new Command('cd ' . constant('FLOW_PATH_ROOT') . ' && ' . $commandArgument);
                if ($command->execute()) {
                    $cdCommand = strpos($commandArgument, 'cd ');
                    if($cdCommand === false) {
                        $result = $command->getOutput();
                        $code = 200;
                    } else {
                        $result = 'You can\'t use \'cd\' commands atm.';
                        $code = 0;
                    }
                } else {
                    $result = $command->getError();
                    $code = $command->getExitCode();
                }
            } else {
                $result = 'The command \'' . $commandArgument .'\' is not allowed in SafeMode.';
                $code = 0;
            }
        } else {
            $result = 'Required parameter \'command\' is not set.';
            $code = 0;
        }
        $this->view->assign('value', ['response' => ($code !== 200 ? 'error' : 'success'), 'result' => $result]);
    }

}
